import Image from "next/image";
import React, { useState } from "react";

interface CreateForm {
  name: string;
  quantity: string;
  category: string;
}

const defaultCreateFormValue: CreateForm = {
  name: "",
  quantity: "",
  category: "",
};

const formInputList = ["name", "quantity", "category"];

export default function Form({ handleShow }: { handleShow: () => void }) {
  return (
    <div className="fixed inset-0 flex justify-center sm:ml-40  items-center bg-black bg-opacity-10">
      <div className="bg-white w-full m-4 h-60 rounded-lg">
        <div
          className="p-3 text-white float-right inline cursor-pointer"
          onClick={handleShow}
        >
          <Image
            alt="close"
            className="rounded-full border border-black"
            src={"https://www.svgrepo.com/show/365893/x-thin.svg"}
            height={25}
            width={25}
          />
        </div>
        <form className="mt-16 flex flex-col items-center">
        <h1 className="font-bold">Add Item Form</h1>
          <div className="flex flex-col mt-4">
            {formInputList.map((input) => (
              <div key={input} className="flex gap-1 mb-4">
                <label className="w-1/3 text-right pr-2 uppercase">{input}</label>
                <input type="text" className="border rounded w-2/3" />
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
