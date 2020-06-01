const urljson = "./assets/json/chile.json";
const selectRegion = document.querySelector('#region');
const selectProvincia = document.querySelector('#provincia');
const selectComuna = document.querySelector('#comuna');
const inputNombre = document.querySelector('#nombre');
const inputApellidoPaterno = document.querySelector('#apellidoPaterno');
const inputApellidoMaterno = document.querySelector('#apellidoMaterno');
const inputDireccion = document.querySelector('#direccion');
const botonAgregar = document.querySelector('#agregar');
const botonEliminar = document.querySelector('#eliminar');
const persona_reg ={id_reg:[],
                    nombre_reg:[],
                    apemate_reg:[],
                    apepate_reg:[],
                    dir_reg:[],
                    region_reg:[],
                    provincia_reg:[],
                    comuna_reg:[],
                  status:[]
                    }
$(document).ready(function() {
  llenaRegion();
                             });

selectRegion.addEventListener('input', ()=> {

  //selectComuna.innerHTML='<option selected="true" disabled="disabled">::Seleccione comuna::</option>';
  if((persona_reg.status.indexOf(2)==-1)){ 
    $(`#provincia`).empty();
     llenaProvincia();}else{llenaProvincia()}

}); 

selectProvincia.addEventListener('input',()=>{
  //selectComuna.innerHTML='<option selected="true" disabled="disabled">::Seleccione comuna::</option>';
 if ((persona_reg.status.indexOf(2)==-1)){ 
    $(`#comuna`).empty();
    llenaComuna();}else{llenaComuna()}
  
                                           }); 

/*selectComuna.addEventListener('input',()=>{
 //selectComuna.innerHTML='<option selected="true" disabled="disabled">::Seleccione comuna::</option>';
 if(!(persona_reg.status.indexOf(2)==-1)){
     
  
}
                                          }); */



botonAgregar.addEventListener('click',()=>{
  let i=0;
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

                                         }
                              );  

botonEliminar.addEventListener('click',()=>{

  
  if(!(persona_reg.status.indexOf(2)==-1)){
     let hazlo=confirm(`Desea eliminar este registro?`);
    if(hazlo){
      const localizacion=persona_reg.status.indexOf(2);
      $(`.${persona_reg.id_reg[localizacion]}`).empty();
      persona_reg.status[localizacion]=3;
      limpiarCampos();
            }
  }

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
            selectRegion.innerHTML='<option selected="true" disabled="disabled">::Seleccione Región::</option>';
            selectProvincia.innerHTML='<option selected="true" disabled="disabled">::Seleccione Provincia::</option>';
            selectComuna.innerHTML='<option selected="true" disabled="disabled">::Seleccione comuna::</option>';
            llenaRegion();           
            
            inputNombre.focus();
                                  }
                                            
                                                        
function editar(fila) {

  $("#nombre").val($(fila).find("td").eq(0).html());
  $("#apellidoPaterno").val($(fila).find("td").eq(1).html());
  $("#apellidoMaterno").val($(fila).find("td").eq(2).html());
  $("#direccion").val($(fila).find("td").eq(3).html());
  /*$("#region").val($(fila).find("td").eq(4).html());
  $("#provincia").val($(fila).find("td").eq(5).html());
  $("#comuna").val($(fila).find("td").eq(6).html());*/

  
     

for (let index = 0; index < persona_reg.status.length; index++) {
  
  if(persona_reg.status[index]==2){
  persona_reg.status[index]=1;
                                        }
}

const localizacion=persona_reg.id_reg.indexOf(fila.className);
persona_reg.status[localizacion]=2;

selectRegion.innerHTML =`<option selected="true">${persona_reg.region_reg[localizacion]}</option>`;
llenaRegion();
selectProvincia.innerHTML =`<option selected="true">${persona_reg.provincia_reg[localizacion]}</option>`;
llenaProvincia();
selectComuna.innerHTML =`<option selected="true">${persona_reg.comuna_reg[localizacion]}</option>`;
llenaComuna();
  
}
                                  
function insertar(){
  
  if(!(persona_reg.status.indexOf(2)==-1)){
    
    const localizacion=persona_reg.status.indexOf(2);
    
    persona_reg.nombre_reg[localizacion]   =inputNombre.value;
    persona_reg.apepate_reg[localizacion]  =(inputApellidoPaterno.value);
    persona_reg.apemate_reg[localizacion]  =(inputApellidoMaterno.value);
    persona_reg.dir_reg[localizacion]      =(inputDireccion.value);
    persona_reg.region_reg[localizacion]   =(selectRegion.value); 
    persona_reg.provincia_reg[localizacion] =(selectProvincia.value);
    persona_reg.comuna_reg[localizacion]   =(selectComuna.value);

    

    $(`.${persona_reg.id_reg[localizacion]}`).empty();

    $(`.${persona_reg.id_reg[localizacion]}`).append(`
    
      <td id="nombreCol">${inputNombre.value}</td>
      <td id="apePateCol">${inputApellidoPaterno.value}</td>
      <td id="apeMateCol">${inputApellidoMaterno.value}</td>
      <td id="dirCol">${inputDireccion.value}</td>
      <td id="regionCol">${selectRegion.value}</td>
      <td id="provinciaCol">${selectProvincia.value}</td>
      <td id="comunaCol">${selectComuna.value}</td>
    `);

    persona_reg.status[localizacion]=1;

  }else{
  persona_reg.nombre_reg.push   (inputNombre.value);
  persona_reg.apepate_reg.push  (inputApellidoPaterno.value);
  persona_reg.apemate_reg.push  (inputApellidoMaterno.value);
  persona_reg.dir_reg.push      (inputDireccion.value);
  persona_reg.region_reg.push   (selectRegion.value);
  persona_reg.provincia_reg.push(selectProvincia.value);
  persona_reg.comuna_reg.push   (selectComuna.value);
  
  
$("#insertar").append(`
    <tr id="datos" onclick="editar(this)" class="id_${persona_reg.nombre_reg.length}">
      <td id="nombreCol">${inputNombre.value}</td>
      <td id="apePateCol">${inputApellidoPaterno.value}</td>
      <td id="apeMateCol">${inputApellidoMaterno.value}</td>
      <td id="dirCol">${inputDireccion.value}</td>
      <td id="regionCol">${selectRegion.value}</td>
      <td id="provinciaCol">${selectProvincia.value}</td>
      <td id="comunaCol">${selectComuna.value}</td>
    </tr>`);

    persona_reg.id_reg.push(`id_${persona_reg.nombre_reg.length}`);
    persona_reg.status.push(1);
    

    /*
    $("#insertar").find("tr").click(function() {
      alert($(this).find("td").eq(0).html());
    });
    */
  }
    

}




                                 /* $("#datos td" ).click(function(){
                                    $(this).addClass('senalado').siblings().removeClass('senalado'); 
                                    console.log(this);   
                                    var value=$(this).html();
                                    alert(value); 
                             
                                 });
                                  
document.querySelector('#dato'),addEventListener('click',()=>{
console.log('click');*/
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
                               //            }); 