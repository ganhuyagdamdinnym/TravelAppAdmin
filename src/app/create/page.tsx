"use client";
import { useCreateTravelMutation } from "@/generated";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { facilitiesData, facilitiesType } from "../assets/facilities";
import { DatePickerWithRange } from "../_components/DatePick";
import { Card } from "@/components/ui/card";
type RunDown = {
  title: string;
  description: string;
};
type Informations = {
  runDown: Array<RunDown>;
  note: string;
};
const Create = () => {
  const [createProduct, { data, loading, error }] = useCreateTravelMutation();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [startAt, setStartAt] = useState<string>("");
  const [endAt, setEndAt] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<File | undefined>();
  const [uploadedImageUrl, setUploadedImageuRL] = useState<string>("");
  const [base64, setBase64] = useState<string>("");
  const [facilities, setFacilities] = useState<facilitiesType>([]);
  const [informations, setInformations] = useState<Informations>({
    runDown: [{ title: "", description: "" }],
    note: "",
  });
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setBase64(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const sendImageHandler = async () => {
    if (imageUrl) {
      const formData = new FormData();
      formData.append("file", imageUrl);
      try {
        const res = await fetch("http://localhost:8080/api/uploadImage", {
          method: "POST",
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          body: formData,
        });
        const response = await res.json();
        console.log("res", response);
        console.log("hhaaa", response.url);
        setUploadedImageuRL(response.uploadUrl);
      } catch (err) {
        console.log("err");
      }
      //   const response = await res.json();
      //   console.log(response);
      // setUploadedImage(response.url);
      // setLoading(false);
    }
  };

  const handleFacilities = (facility: string) => {
    setFacilities((prev) => {
      if (prev.includes(facility)) {
        return prev.filter((item) => item !== facility);
      } else {
        return [...prev, facility];
      }
    });
  };

  const handleCreateProduct = async () => {
    const inputProduct = {
      name,
      location,
      price,
      description,
      startAt,
      endAt,
      duration,
      facilities,
      imageUrl: uploadedImageUrl,
      rating,
      informations,
    };
    try {
      await createProduct({
        variables: { input: inputProduct },
      });
      console.log("Product created successfully:", data);
    } catch (err) {
      console.log("Error creating product:", err);
    }
  };

  const handleRunDownChange = (
    index: number,
    field: keyof RunDown,
    value: string
  ) => {
    setInformations((prev) => ({
      ...prev,
      runDown: prev.runDown.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
    console.log(informations);
  };

  return (
    <div className="w-full h-screen flex flex-row ">
      <div className=" flex gap-6  p-8">
        <div>
          <Card>
            <label
              htmlFor="file-upload"
              className="custom-file-upload w-[600px] h-[500px] rounded-xl flex items-center justify-center "
            >
              {imageUrl ? (
                <img src={base64} alt="uploaded" />
              ) : (
                <img src="camera.svg" alt="photo" height={50} width={50} />
              )}
            </label>
          </Card>
          <input
            onChange={handleImageChange}
            id="file-upload"
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
            className="hidden"
          />
        </div>
        <button onClick={sendImageHandler}>upload</button>
        <div className=" flex items-center gap-6 flex-col w-[500px]">
          <Input
            type="string"
            placeholder="Product name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
          <Input
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            value={price !== undefined ? price.toString() : ""}
            placeholder="Price"
            type="number"
          />
          <Input
            onChange={(e) => setRating(parseFloat(e.target.value))}
            value={rating !== undefined ? rating.toString() : ""}
            placeholder="Price"
            type="number"
          />
          <Input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
          />
          <div className="flex gap-4">
            <DatePickerWithRange
              startAt={startAt}
              setStartAt={setStartAt}
              endAt={endAt}
              setEndAt={setEndAt}
            />
            <input
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
              placeholder="Duration"
              className="w-[130px] h-10 border-2 border-[#1963E6] rounded-xl p-2"
            />
          </div>
          <div className="w-[600px] flex flex-wrap">
            <h1 className="w-full justify-center flex text-[20px]">
              Please choose facilities
            </h1>
            <div className="w-full flex flex-row gap-2 flex-wrap justify-center">
              {facilitiesData.map((facility) => (
                <div>
                  {facilities.includes(facility) ? (
                    <Button
                      key={facility}
                      onClick={() => handleFacilities(facility)}
                    >
                      {facility}
                    </Button>
                  ) : (
                    <Button
                      key={facility}
                      onClick={() => handleFacilities(facility)}
                      variant="secondary"
                    >
                      {facility}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Button onClick={handleCreateProduct}>Create</Button>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <h2>Informations</h2>
        {informations.runDown.map((item, index) => (
          <div key={index} className="mb-4 flex flex-col gap-2">
            {index + 1}
            <Input
              type="text"
              value={item.title}
              placeholder="Title"
              onChange={(e) =>
                handleRunDownChange(index, "title", e.target.value)
              }
              className="w-96"
            />
            <Textarea
              value={item.description}
              placeholder="Description"
              onChange={(e) =>
                handleRunDownChange(index, "description", e.target.value)
              }
            />
          </div>
        ))}
        <Button
          onClick={() =>
            setInformations((prev) => ({
              ...prev,
              runDown: [...prev.runDown, { title: "", description: "" }],
            }))
          }
        >
          Add Run Down
        </Button>
      </div>
    </div>
  );
};

export default Create;
