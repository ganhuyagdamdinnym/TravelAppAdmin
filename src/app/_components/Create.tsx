"use client";
import { useCreateTravelMutation } from "@/generated";
import { useState } from "react";
import { facilitiesData, facilitiesType } from "../assets/facilities";
type RunDown = {
  title: string;
  description: string;
};
type Informations = {
  runDown: Array<RunDown>;
  note: string;
};

export const Create = () => {
  const [createProduct, { data, loading, error }] = useCreateTravelMutation();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [startAt, setStartAt] = useState<string>("");
  const [endAt, setEndAt] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [base64, setBase64] = useState<string>("");
  const [facilities, setFacilities] = useState<facilitiesType>([]);
  const [informations, setInformations] = useState<Informations>({
    runDown: [{ title: "", description: "" }],
    note: "",
  });
  const [runDown, setRunDown] = useState<number>(1);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target?.result as string);
      setBase64(event.target?.result as string);
    };
    reader.readAsDataURL(file);
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
      imageUrl: base64,
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
      <div className=" flex items-center gap-6 flex-col p-8">
        <div>
          <label
            htmlFor="file-upload"
            className="custom-file-upload w-[600px] h-[500px] border-2 border-solid rounded-xl flex items-center justify-center border-[#be9131]"
          >
            {imageUrl ? (
              <img src={imageUrl} alt="uploaded" />
            ) : (
              <img src="camera.svg" alt="photo" height={50} width={50} />
            )}
          </label>
          <input
            onChange={handleImageUpload}
            id="file-upload"
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
            className="hidden"
          />
        </div>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
          className="w-[400px] h-10 border-2 border-black rounded-xl p-2"
        />
        <input
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder="Location"
          className="w-[400px] h-10 border-2 border-black rounded-xl p-2"
        />
        <input
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          value={price !== undefined ? price.toString() : ""}
          placeholder="Price"
          className="w-[400px] h-10 border-2 border-black rounded-xl p-2"
          type="number"
        />
        <input
          onChange={(e) => setRating(parseFloat(e.target.value))}
          value={rating !== undefined ? rating.toString() : ""}
          placeholder="Price"
          className="w-[400px] h-10 border-2 border-black rounded-xl p-2"
          type="number"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Description"
          className="w-[400px] h-10 border-2 border-black rounded-xl p-2"
        />
        <div className="flex gap-4">
          <input
            onChange={(e) => setStartAt(e.target.value)}
            value={startAt}
            placeholder="Start at"
            className="w-[130px] h-10 border-2 border-black rounded-xl p-2"
          />
          <input
            onChange={(e) => setEndAt(e.target.value)}
            value={endAt}
            placeholder="End at"
            className="w-[130px] h-10 border-2 border-black rounded-xl p-2"
          />
          <input
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            placeholder="Duration"
            className="w-[130px] h-10 border-2 border-black rounded-xl p-2"
          />
        </div>
        <div className="w-[600px] flex flex-wrap">
          <h1 className="w-full justify-center flex text-[20px]">
            Please choose facilities
          </h1>
          <div className="w-full flex flex-row gap-2 flex-wrap justify-center">
            {facilitiesData.map((facility) => (
              <button
                key={facility}
                onClick={() => handleFacilities(facility)}
                className={`px-2 py-1 h-10 rounded-xl text-white ${
                  facilities.includes(facility) ? "bg-blue-500" : "bg-black"
                }`}
              >
                {facility}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleCreateProduct}
          className="rounded-2xl bg-black text-white py-2 px-4"
        >
          Create
        </button>
      </div>
      <div className="mt-10">
        <h2 className="text-black">Informations</h2>
        {informations.runDown.map((item, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={item.title}
              placeholder="Title"
              onChange={(e) =>
                handleRunDownChange(index, "title", e.target.value)
              }
              className="w-[300px] h-10 border-2 border-black rounded-xl p-2"
            />
            <textarea
              value={item.description}
              placeholder="Description"
              onChange={(e) =>
                handleRunDownChange(index, "description", e.target.value)
              }
              className="w-[400px] h-20 border-2 border-black rounded-xl p-2"
            />
          </div>
        ))}
        <button
          onClick={() =>
            setInformations((prev) => ({
              ...prev,
              runDown: [...prev.runDown, { title: "", description: "" }],
            }))
          }
          className="rounded-2xl bg-black text-white py-2 px-4 mt-2"
        >
          Add Run Down
        </button>
      </div>
    </div>
  );
};
