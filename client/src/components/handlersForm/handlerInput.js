



const handlerInput = (e, setForm, form, setCondition) =>{
   
    
    let property = e.target.name;
    let value = e.target.value
    console.log(property);
    
    setForm({
        ...form,
        [property]: e.target.value
    })
   
   
      if(property === "name"){
    if(value.match("^[a-zA-Z1-9ñÑáéíóúÁÉÍÓÚ° -]{1,25}$")) setCondition("")
    else setCondition("Solo se premiten mayusculas, minusculas, guiones y numeros")
    }

    if(property === "background_image"){
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    if(!value.match(urlRegex)) setCondition("El url no es valido")
    else setCondition("")
    }

     if(property === "description"){
    const descriptionRegex = /^[\s\S]{40,2000}$/;
    if(!value.match(descriptionRegex)) setCondition("La cantidad de caracteres no debe ser inferior a 40 y superior a 2000 caracteres")
    else setCondition("")
    }
    if(property === "rating"){
        
        if(value > 5 | value < 0) setCondition("El rating debe ser entre 0 a 5 ")

        else setCondition("")
    }
    if(property === "release_date"){
        
        if(value.length !== 10){
            setCondition("Debe agregar una fecha")
        }else{
            setCondition("")
        }
    }
}
    

export default handlerInput;