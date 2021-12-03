import { uploadFile } from "../../helpers/uploadFile";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API,
  api_secret: process.env.REACT_APP_CLOUDINARY_SECRET,
});

describe("UploadFile - Helper", () => {
  test("should upload a file", async () => {
    const fakeImg =
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png";
    const response = await fetch(fakeImg);
    const blop = await response.blob();
    const file = new File([blop], "test.png");
    const url = await uploadFile(file);

    expect(typeof url).toBe("string");

    const segmetns = url.split("/");
    const imgId = segmetns[segmetns.length - 1].replace(".png", "");
    cloudinary.v2.api.delete_resources(imgId, {}, () => {}).then(() => {});
  });

  test("should return an error", async () => {
    const file = new File([], "test.png");
    const url = await uploadFile(file);

    expect(url).toBe(null);
  });
});
