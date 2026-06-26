import express from "express";
import multer from "multer";
import cors from "cors";
import sharp from "sharp";

const app = express();

app.use(cors());

const upload = multer({
    storage: multer.memoryStorage(),
});

app.get("/", (_, res) => {
    res.send("QT-Seize API running");
});

app.post("/resize", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No image uploaded",
            });
        }

        const width = Number(req.body.width);
        const height = Number(req.body.height);
        const quality = Number(req.body.quality);

        const format = String(req.body.format || "jpeg");

        let pipeline = sharp(req.file.buffer)
            .rotate()
            .resize({
                width,
                height,
                fit: "cover",
                position: "centre",
                withoutEnlargement: false,
                kernel: sharp.kernel.lanczos3,
            });

        if (req.body.sharpen === "true") {
            pipeline = pipeline.sharpen();
        }

        let buffer: Buffer;
        let contentType: string;

        switch (format) {
            case "png":
                buffer = await pipeline.png().toBuffer();
                contentType = "image/png";
                break;

            case "webp":
                buffer = await pipeline
                    .webp({
                        quality,
                    })
                    .toBuffer();

                contentType = "image/webp";
                break;

            case "jpeg":
            default:
                buffer = await pipeline
                    .jpeg({
                        quality,
                        mozjpeg: true,
                    })
                    .toBuffer();

                contentType = "image/jpeg";
                break;
        }

        res.setHeader("Content-Type", contentType);
        res.send(buffer);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Resize failed",
        });
    }
});
const PORT = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
    console.log(`🚀 QT-Seize API running on port ${PORT}`);
});