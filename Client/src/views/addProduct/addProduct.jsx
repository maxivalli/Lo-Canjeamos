import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Header from "../../components/header/Header";
import Banner from "../../assets/banner1.jpg";
import Banner2 from "../../assets/banner2.jpg";
import style from "./AddProduct.module.css";
import axios from "axios";

export default function AddProduct({ userData }) {
  const { id } = userData

  //Configuración de la biblioteca para cargar imagenes.
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  };

  // ↓ Sin uso ↓

  // const thumb = {
  //   display: "inline-flex",
  //   marginBottom: 8,
  //   marginRight: 8,
  //   width: 70,
  //   height: 70,
  //   padding: 4,
  //   boxSizing: "border-box",
  // };

  // const thumbInner = {
  //   display: "flex",
  //   minWidth: 0,
  //   overflow: "hidden",
  // };

  const img = {
    display: "block",
    borderRadius: 5,
    width: 60,
    height: 60,
    marginRight: 5,
  };

  // Constantes para Cloudinary.

  const preset_key = "postsimages";
  const cloud_name = "dlahgnpwp";
  const folderName = "postimages";
  
  const [files, setFiles] = useState([]);
  const [imageSecureUrls, setImageSecureUrls] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {

    const selectedFiles = acceptedFiles

    if (files.length + acceptedFiles.length > 3) {
      alert("¡No puedes cargar más de 3 imágenes!")
      return; // No agregues más archivos
    }

    const updatedFiles = [...selectedFiles];

    const updatedImageSecureUrls = updatedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setFiles(updatedFiles);
    setImageSecureUrls(updatedImageSecureUrls);

    const uploadPromises = updatedFiles.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);
      formData.append("folder", folderName);

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,
          formData
        )
        .then((res) => res.data.secure_url)
        .catch((error) => {
          console.log("Error al subir las imágenes: " + error);
          return null;
        });
    });

    Promise.all(uploadPromises).then((imageUrls) => {
      // Filtrar los resultados nulos, en caso de que haya habido errores
      const validImageUrls = imageUrls.filter((url) => url !== null);
      const newImageSecureUrls = [...imageSecureUrls, ...validImageUrls];
      setImageSecureUrls(newImageSecureUrls);
    });
  }, [files.length, imageSecureUrls]) 

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, maxFiles:3, 'image/*': ['.jpeg', '.png']});

  // Función de Maxi sin uso (comment by Agus).

  // const thumbs = files.map((file) => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       <img
  //         src={file.preview}
  //         style={img}
  //         onLoad={() => {
  //           URL.revokeObjectURL(file.preview);
  //         }}
  //       />
  //     </div>
  //   </div>
  // ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  //Manejo del formulario


  /* Tuve que borrar todo el manejo del formulario porque se me rompia todo y no queria estar buscando parte por parte,
  ya que basicamente tuve que reescribir todo el componenente.  */


  //Menejo de la API para obtener las provincias y las localidades.
  const [provinces, setProvinces] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [ localidad, setSelectedLocalidad ] = useState("")
  useEffect(() => {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setProvinces(json.provincias);
      })
      .catch((error) => {
        console.error(
          `Error: ${error.status}: ${error.statusText || "Ocurrió un error"}`
        );
      });
  }, []);

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setSelectedProvince(selectedProvince);

    fetch(
      `https://apis.datos.gob.ar/georef/api/localidades?provincia=${selectedProvince}&max=500`
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setLocalities(json.localidades);
      })
      .catch((error) => {
        console.error(
          `Error al obtener las localidades: ${error.status}: ${
            error.statusText || "Ocurrió un error"
          }`
        );
      });
  };
  const handleLocalidadChange = (e) => {
    const selectedLocalidad = e.target.value;
    setSelectedLocalidad(selectedLocalidad);
  };
  const sortedProvinces = provinces.sort((a, b) => {
    return a.nombre.localeCompare(b.nombre);
  });

  const sortedLocalities = localities.sort((a, b) => {
    return a.nombre.localeCompare(b.nombre);
  });

  //Manejo de las categorías.
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = [
    "Rodados con motor",
    "Rodados sin motor",
    "Cámaras y accesorios",
    "Celulares",
    "Computadoras",
    "Audio y video",
    "Videojuegos",
    "Antiguedades",
    "Electrodomésticos",
    "Herramientas",
    "Muebles y hogar",
    "Arte y artesanías",
    "Alimentos",
    "Joyas y relojes",
    "Ropa e indumentaria",
    "Varios",
  ];

  
  const [formData, setFormData] = useState({
    title: '',
    description: "",
    image: null,
    ubication: "",
    category: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleFile(event) {
    const selectedFiles = event.target.files;

    if (files.length + selectedFiles.length > 3) {
      alert("¡Solo puedes subir un máximo 3 imágenes!")
      return; // No agregues más archivos
    }

    const updatedFiles = [...selectedFiles];

    const updatedImageSecureUrls = updatedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setFiles(updatedFiles);
    setImageSecureUrls(updatedImageSecureUrls);

    const uploadPromises = updatedFiles.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);
      formData.append("folder", folderName);

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/`,
          formData
        )
        .then((res) => res.data.secure_url)
        .catch((error) => {
          console.log("Error al subir las imágenes: " + error);
          return null;
        });
    });

    Promise.all(uploadPromises).then((imageUrls) => {
      // Filtrar los resultados nulos, en caso de que haya habido errores
      const validImageUrls = imageUrls.filter((url) => url !== null);
      const newImageSecureUrls = [...imageSecureUrls, ...validImageUrls];
      setImageSecureUrls(newImageSecureUrls);
    });
  }

 const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        let newPost = {
          title: formData.title,
          description: formData.description,
          image: imageSecureUrls,
          ubication: `${selectedProvince}, ${localidad}`,
          category: selectedCategory,
          UserId: id
        }
        console.log(newPost)
      const response = await axios.post('http://localhost:3001/posts/', newPost)

      if (response) {
        // La solicitud se completó con éxito
        alert("Producto creado correctamente")
        // Reinicio de campos.
        setImageSecureUrls([])
        setLocalities([])
        setProvinces([])
        setSelectedCategory("");
        setSelectedLocalidad("");
        setSelectedProvince("");
        setFormData({
          title: '',
          description: "",
        })
      } else {
        // Hubo un error en la solicitud
        console.log('Hubo un error al crear la publicacion.');
      }
    } catch (error) {
      console.error('Error al enviar los datos al servidor:', error);
      console.log('Hubo un error al crear la publicacion.');
    }
  }

  
  
  
  return (
    <>
      <Header banner1={Banner} banner2={Banner2}></Header>
      <div className={style.container}>
        <h3>Crear publicación</h3>
        <form className={style.create}>
          <div className={style.part1}>
            <label>
              Titulo*
              <input
                className={style.input}
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Inserte titulo"
              />
            </label>
            <label>
              Descripción
              <input
                className={style.input}
                type="text"
                name="description"
                onChange={handleChange}
                value={formData.description}
                placeholder="Inserte descripcion"
              />
            </label>
            <label>
              Imagen*
              <section className={style.files}>
                <div className="dropzone" {...getRootProps()} onClick={event => event.stopPropagation()}>
                  <input {...getInputProps()} onChange={handleFile}/>
                  {isDragActive ? 'Suelta tus archivos aquí' : 'Selecciona o arrastra tus archivos aquí'}
                </div>
                {imageSecureUrls.length > 0 && <div style={thumbsContainer}>
                  {imageSecureUrls.map((file, index) => <img style={img} src={file} key={index}/>)}  
                </div>}
              </section>
            </label>
          </div>
          <div className={style.part2}>
            <label>Provincias*</label>
            <select onChange={handleProvinceChange}>
              <option value="Elige una provincia">Provincia</option>
              {sortedProvinces.map((province) => (
                <option key={province.id} value={province.nombre}>
                  {province.nombre}
                </option>
              ))}
            </select>
            <span></span>
            <label>Localidad*</label>
            <select id="selectLocalidades" onChange={handleLocalidadChange}>
              <option value="Elige una localidad">Localidad</option>
              {sortedLocalities.map((locality) => (
                <option key={locality.id} value={locality.nombre}>
                  {locality.nombre}
                </option>
              ))}
            </select>
            <span></span>
            <label>Categoría*</label>
            <select
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="Elige una categoría">Categoría</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <span></span>
          </div>
        </form>
        <button type="submit" onClick={handleSubmit} className={style.button}>
          Crear
        </button>
        <h5 className={style.message}>Los campos con * son obligatorios</h5>
      </div>
    </>
  );
}
