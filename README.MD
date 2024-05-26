# Express TypeScript Puppeteer project to generate PDF from HTML

This project is a Node.js Express application that uses Puppeteer to generate PDFs from HTML content. Here's how to get it up and running:

## Using code from this repository

#### Clone the repository

```
$ git clone git@github.com:lcshobin/html-to-pdf.git
```

#### Build the Docker Image

```
$ docker build -t html-to-pdf-ts .
```

#### Run the Docker Image

```
$ docker run  html-to-pdf-ts
```

## Running on development mode

#### Clone the repository

```
$ git clone git@github.com:lcshobin/html-to-pdf.git
```

#### Use docker compose to run the application

```
$ docker compose up
```

## Using docker hub

```
docker run -d -p 3000:3000 lcshobin/html-to-pdf
```

## Sample requrest json

```
{
  "format": "Letter",
  "printBackground": true,
  "width": "595px",
  "height": "842px",
  "html": "<html><body><h1>Sample HTML</h1></body></html>",
  "headerTemplate": "<div style='font-size: 10px; text-align: center;'>Header</div>",
  "footerTemplate": "<div style='font-size: 10px; text-align: center;'>Page <span class='pageNumber'></span> of <span class='totalPages'></span></div>",
  "margin": {
    "top": "1in",
    "right": "0.75in",
    "bottom": "1in",
    "left": "0.75in"
  }
}
```
