const urljson = "./assets/json/chile.json";
const selectRegion = document.querySelector('#region');
const selectProvincia = document.querySelector('#provincia');
const selectComuna = document.querySelector('#comuna');
const inputNombre = document.querySelector('#nombre');
const inputApellidoPaterno = document.querySelector('#apellidoPaterno');
const inputApellidoMaterno = document.querySelector('#apellidoMaterno');
const inputDireccion = document.querySelector('#direccion');
const boton = document.querySelector('#agregar');

selectRegion.addEventListener('input', ()=> { 
  llenaRegion(); 
}); 

selectRegion.addEventListener('input', ()=> {
  selectProvincia.innerHTML='<option selected="true" disabled="disabled">::Seleccione Provincia::</option>';
  llenaProvincia();
}); 

$(document).ready(function() {
  llenaRegion();
});

function llenaRegion() {
  $.getJSON(urljson, function(region) {
      for(let x = 0; x < region.length; x++) {        
        $("#region").append("<option id='" + region[x].region_number + "'>" + region[x].region + "</option>");
      }
  });
}

function llenaProvincia() {
    const region_number=selectRegion.options[selectRegion.selectedIndex].id;
      $.getJSON(urljson, function(region) {
          for(let x = 0; x < region.length; x++) {
            if((region_number==region[x].region_number )){
                for(let y = 0; y < region[x].provincias.length; y++){
               $("#provincia").append("<option>" + region[x].provincias[y].name + "</option>");
                                                                     }
                                                         }            
                                                 }
                                                                 });}


function llenaComuna() {
  const region_number=selectRegion.options[selectRegion.selectedIndex].id;
  const provincia_nombre=selectProvincia.options[selectProvincia.selectedIndex].value;
  $.getJSON(urljson, function(region) {
    for(let x = 0; x < region.length; x++) {
      if((region_number==region[x].region_number )){
          for(let y = 0; y < region[x].provincias.length; y++){
            if(provincia_nombre==region[x].provincias[y].name){
              for(let z = 0; z < region[x].provincias[y].comunas.length; z++){
                $("#comuna").append("<option>" + region[x].provincias[y].comunas[z].name + "</option>");
                                                                             }
                                                               }
            
                                                               }
                                                   }            
                                           }
                                                           });}

selectProvincia.addEventListener('input',()=>{
selectComuna.innerHTML='<option selected="true" disabled="disabled">::Seleccione comuna::</option>';
llenaComuna();
                                         }); 

 function validar(){
  if((selectRegion.value=='::Seleccione Región::')||
     (selectProvincia.value=='::Seleccione Provincia::')||
     (selectComuna.value=='::Seleccione comuna::')||
     (inputNombre.value=='')||
     (inputApellidoPaterno.value=='')||
     (inputApellidoMaterno.value=='')||
     (inputDireccion.value==''))
         {
       alert('Por favor ingrese los datos solicitados ');
      return false;
  
          }else{
            return true;
               }
        }
    
 function limpiarCampos(){
            inputNombre.value='';
            inputApellidoPaterno.value='';
            inputApellidoMaterno.value='';
            inputDireccion.value='';
            selectRegion.value='::Seleccione Región::';
            selectProvincia.value='::Seleccione Provincia::';
            selectComuna.value='::Seleccione comuna::';
                                  }
                                            
                                                        
function editar(fila) {
  $("#nombre").val($(fila).find("td").eq(0).html());
}
                                  
function insertar(){
  
  $("#insertar").append(`
    <tr id="datos" onclick="editar(this)">
      <td id="nombreCol">${inputNombre.value}</td>
      <td id="apePateCol">${inputApellidoPaterno.value}</td>
      <td id="apeMateCol">${inputApellidoMaterno.value}</td>
      <td id="dirCol">${inputDireccion.value}</td>
      <td id="regionCol">${selectRegion.value}</td>
      <td id="provinciaCol">${selectProvincia.value}</td>
      <td id="comunaCol">${selectComuna.value}</td>
    </tr>`);

    /*
    $("#insertar").find("tr").click(function() {
      alert($(this).find("td").eq(0).html());
    });
    */

}

boton.addEventListener('click',()=>{
  i=0;
  do {
    if(validar()){
      i++;
      insertar();
      limpiarCampos();
                 }
    else{
      i=0;
        }
  
     } while (i<0);
                                  });  


                                  $("#datos td" ).click(function(){
                                    $(this).addClass('senalado').siblings().removeClass('senalado'); 
                                    console.log(this);   
                                    var value=$(this).html();
                                    alert(value); 
                             
                                 });
                                  
document.querySelector('#dato'),addEventListener('click',()=>{
console.log('click');
//$(this).addClass('selenalado').siblings().removeClass('senalado');



  /*$("#datos").click(function(){
    $(this).addClass('selected').siblings().removeClass('selected');    
    var value=$(this).find('td:first').html();
    alert(value);    
 });
 
 $('.ok').on('click', function(e){
     alert($("#table tr.selected td:first").html());
 });*/
  
//console.log(typeof(document.querySelector('#nombreCol2').value));

 /*inputNombre.value          =document.querySelector('#nombreCol2').innerHTML;
  inputApellidoPaterno.value =document.querySelector('#apePateCol2').innerHTML;
  inputApellidoMaterno.value =document.querySelector('#apeMateCol2').innerHTML;
  inputDireccion.value       =document.querySelector('#dirCol2').innerHTML;
  selectRegion.value         ="<option>" +document.querySelector('#regionCol2').innerHTML+ "</option>";
  selectProvincia.value      ="<option>" +document.querySelector('#provinciaCol2').innerHTML+ "</option>";
  selectComuna.value         ="<option>" +document.querySelector('#comunaCol2').innerHTML+ "</option>";*/
                                           }); 