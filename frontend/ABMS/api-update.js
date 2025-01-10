const https = require("https");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const swaggerEndpoint = "https://localhost:7163/swagger/v1/swagger.json";
const swaggerFileLocation = "./swagger.json";
const outputDir = "./src/api";

async function runSequence() {
  console.log("Initiating workflow...");
  try {
    await fetchSwagger();
    cleanDirectory(outputDir);
    await generateTypes();
  } catch (err) {
    console.error("Workflow failed:", err.message);
  }
}

function fetchSwagger() {
  return new Promise((resolve, reject) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    https
      .get(swaggerEndpoint, (response) => {
        const fileStream = fs.createWriteStream(swaggerFileLocation);
        response.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          console.log("Swagger JSON acquired.");
          resolve();
        });
      })
      .on("error", (downloadError) => {
        console.error("Failed to download Swagger:", downloadError.message);
        reject(downloadError);
      });
  });
}

function cleanDirectory(folderPath) {
  if (!fs.existsSync(folderPath)) {
    console.log(`Directory not found: ${folderPath}`);
    return;
  }
  fs.readdirSync(folderPath).forEach((item) => {
    const itemPath = path.join(folderPath, item);
    if (fs.lstatSync(itemPath).isDirectory()) {
      cleanDirectory(itemPath);
      fs.rmdirSync(itemPath);
    } else {
      fs.unlinkSync(itemPath);
    }
  });
}

function generateTypes() {
  return new Promise((resolve, reject) => {
    exec("npm run generate:api", (error, stdout, stderr) => {
      if (error) {
        console.error("Type generation error:", error);
        reject(error);
      } else {
        console.log("API types generated.");
        console.log(stdout);
        console.log(stderr);
        resolve();
      }
    });
  });
}

runSequence();
