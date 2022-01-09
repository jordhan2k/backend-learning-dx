const fse = require('fs-extra');

const checkPathExists = async (path) => {
    const exists = await fse.pathExists(path);
    console.log(exists);
}
checkPathExists("./utils/tmp");

const copyFile = async (src, dest) => {
    try {
        await fse.copy(src, dest);
    } catch (error) {
        console.log(error);
    }
}

copyFile("./resources/static/uploads/6e3aa6cc-db4f-49ed-b3b8-e9a7879dc425-AYA-Mamamoo.mp3",
    "./utils/tmp/6e3aa6cc-db4f-49ed-b3b8-e9a7879dc425-AYA-Mamamoo.mp3");

fse.mkdirs("./utils/temp/audio").then(() => console.log("success")).catch(err => console.log(err));


const writeJsonFile = async (path, object) => {
    try {
        await fse.writeJSON(path, object);

    } catch (error) {
        console.log(error);
    }
}

writeJsonFile("./utils/temp/file.json",
    {
        username: "Jordan12345",
        password: "abcdxyz"
    })

const readJsonFile = async (path) => {
    try {
        const content = await fse.readJSON(path);
        console.log(content);
    } catch (error) {
        console.log(error);
    }
}

readJsonFile("./utils/temp/file.json");