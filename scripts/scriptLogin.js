
// verifico que el documento se construy apor completo
document.addEventListener('DOMContentLoaded', () => {

     // recupera el formulario por tag
     const form = document.querySelector('form');

     // listener para submit (momento donde verifica valores de los campos)
     form.addEventListener('submit', (event) => {
         if (!validateForm()) {
             event.preventDefault(); // cancela el submit, ya que el contenido es inválido
         } else {
             // continuar con el submit
         }
     });
 
     // Función para validar datos del formulario
     const validateForm = () => {
        let validateEmail;
        let validatePassword;

        validateEmail = validateData('email','email');
        validatePassword = validateData('password','password');

         return (validateEmail && validatePassword);
     };
 
     
     const validateData = (fieldId, fieldType) => {
        const field = document.getElementById(fieldId);
        const fieldValue = field.value.trim();  //trunca
 
        if (fieldValue === '') {
            setErrorMsg(field, 'El dato es obigatorio');
            return false;
        } 
        if (fieldType === 'email') {
            /* cualquier cadena que: 
                usuario no empiece con caracteres espaciales ni tenga @ (^ negacion), seguido de @
                nombre dominio no empiece con caracteres espaciales ni tenga @, seguido de punto
                tipo dominio no empiece con caracteres espaciales ni tenga @ */
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            //tests for a match in a string.    
            if (!regex.test(fieldValue)) {
                setErrorMsg(field, 'El correo electrónico es inválido');
                return false;
            } 
        }
        resetErrorMsg(field); // resetea mensajes de error
        return true;
    };
    
    
     // Función para establecer un mensaje de error en un campo
     const setErrorMsg = (input, message) => {
         const formControl = input.closest('div'); // selecciona el tag padre del input
         const errorDiv = formControl.querySelector('.errorDiv'); // buscar or clase el contenedor del error msg
         formControl.classList.add('error');
         errorDiv.innerText = message;
         input.focus();  // hace foco en el input erroneo para corregirlo
     };
 
     // resetea mensajes de error
     const resetErrorMsg = (input) => {
         const formControl = input.closest('div');
         formControl.classList.remove('error');
         const errorDiv = formControl.querySelector('.errorDiv');
         errorDiv.innerText = '';
     };

      // The input event fires when the value of an <input>, <select>, or <textarea> element has been changed 
      // as a direct result of a user action (such as typing in a textbox or checking a checkbox).
      form.querySelectorAll('input').forEach(input => {
         input.addEventListener('input', () => {
             const value = input.value.trim();
             if (value !== '') { // si el valor truncado es distinto de cadena vacio => OK
                resetErrorMsg(input);
             }
         });
     });
    

});