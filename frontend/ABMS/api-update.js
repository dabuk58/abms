const https = require("https");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const url = "https://localhost:7163/swagger/v1/swagger.json";

const filePath = "./swagger.json";

async function downloadAndGenerateTypes() {
  console.log("Starting process...");
  try {
    await downloadSwagger();
    deleteFolderContents("./src/api");
    await generateApiTypes();
  } catch (error) {
    console.error("Process failed: ", error.message);
  }
}

function downloadSwagger() {
  return new Promise((resolve, reject) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    https
      .get(url, (res) => {
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          console.log("Swagger JSON downloaded successfully.");
          resolve();
        });
      })
      .on("error", (err) => {
        console.error("Error downloading Swagger JSON:", err.message);
        reject(err);
      });
  });
}

function deleteFolderContents(folderPath) {
  if (!fs.existsSync(folderPath)) {
    console.log(`Folder does not exist: ${folderPath}`);
    return;
  }
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderContents(curPath);
        fs.rmdirSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
  }
}

function generateApiTypes() {
  return new Promise((resolve, reject) => {
    exec("npm run generate:api", (error, stdout, stderr) => {
      if (error) {
        console.error("Error generating API types:", error);
        reject(error);
      } else {
        console.log("API types generated successfully.");
        console.log(stdout);
        console.log(stderr);
        resolve();
      }
    });
  });
}

downloadAndGenerateTypes();
