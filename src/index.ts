import  express, { Express, Request, Response }  from "express";
import { validationResult } from "express-validator";
import { pdfSchemaValidation } from "./validation";
import puppeteer, {PaperFormat}  from "puppeteer";

/**
 * Create express application
 */
const app: Express = express();
app.use(express.json());

/**
 * Express route for generating pdf
 */
app.post("/generate-pdf-app", pdfSchemaValidation, async (req: Request, res: Response) => {
  /**
   * Validate input request
   */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    format,
    printBackground,
    width,
    height,
    html,
    headerTemplate,
    footerTemplate,
    margin,
  } = req.body as {
    format: PaperFormat;
    printBackground: boolean;
    width: string;
    height: string;
    html: string;
    headerTemplate: string;
    footerTemplate: string;
    margin: { top: string; right: string; bottom: string; left: string };
  };

  try {
    const browser = await puppeteer.launch({ args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]});
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "domcontentloaded" });
    /**
     * Generate pdf
     */
    const pdf = await page.pdf({
      format,
      printBackground,
      width,
      height,
      displayHeaderFooter: true,
      headerTemplate,
      footerTemplate,
      margin,
    });

    await browser.close();
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });

    res.send(pdf);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF.");
  }
});
/**
 * Port number is hard coded can be defined in configuration
 */
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
