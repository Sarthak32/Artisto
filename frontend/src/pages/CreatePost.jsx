import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {downloadImage} from '../utils'
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { Form, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  
const generateImage = async () => {
  if (form.prompt) {
    try {
      setGeneratingImg(true);
      const prompt = form.prompt;
      const response = await fetch("http://localhost:8080/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Set form's photo property with the image URL
      const data = await response.json();
      const imageUrl = data.image[0];

      console.log(imageUrl);
      setForm({
        ...form,
        photo: imageUrl,
      });

    } catch (error) {
      console.error(error);
      alert("API key overused");
    } finally {
      setGeneratingImg(false);
    }
  } else {
    alert("Please provide a prompt");
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.prompt && form.photo) {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form }),
      });

      await response.json();
      alert('Success');
      navigate('/');
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  } else {
    alert('Please generate an image with proper details');
  }
};
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
}
  const handleSurpriseMe = ()=>{
    const randomPrompt = getRandomPrompt();
    setForm({...form, prompt : randomPrompt});
  }



return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className='mt-2 text-[#66632] text-[13px] max-w [500px]'>
            Unleash your creativity with Artisto's explore page - where imagination meets possibility!
        </p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
        <Form
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            handleChange={handleChange}
          />
            <Form 
            labelName="Start with a detailed description"
            type="text"
            name="prompt"
            placeholder="3D render of a cute tropical fish in an aquarium on a dark blue background, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}

            />

            <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 flex justify-center items-center'>
                    {form.photo ?(
                        <img 
                        src={form.photo}
                        alt={form.prompt} 
                        className='w-full h-full object-contain' />
                        
                    )
                    :(
                        <img 
                        src={preview}
                        alt="preview"
                        className='w-9/12 h-9/12 object-contain opacity-40'
                        />
                    )} 
            
            {generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] '>
                    <Loader />
                </div>
            )
            }
            </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        

        <div className='mt-10'>
            <h1 className='mt-5 font-bold text-[#222328]'>Share your generations</h1>
            <p className="mt-2 text-[#666e75] text-[14px]">Get featured in the example gallery</p>
            <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
      )
}

export default CreatePost