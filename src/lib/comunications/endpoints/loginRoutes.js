export const sendForm = async (/** @type {{ phonenumber: Number; password: string; }} */ formData) => {
    try {
        // Realizamos la solicitud POST con fetch
        const response = await fetch('https://barbermap-server.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Convertir los datos del formulario a JSON
            credentials: 'include',
        });

        // Verificar si la respuesta fue exitosa (código 2xx)
        if (response.ok) {
            // Acceder a los encabezados de la respuesta
            const authHeader = response.headers.get('Authorization');
            const authUserHeader = response.headers.get('authUser')
            // Verificar si el encabezado Authorization existe
            if (authHeader) {
                // Extraer el token (formato: 'Bearer <token>')
                const token = authHeader.split(' ')[1];
                if (token) {
                    // Guardar el token en localStorage
                    localStorage.setItem('Authtoken', token);   
                }
            }
            if(authUserHeader){
                const token = authUserHeader.split(' ')[1];
                if(token){
                    localStorage.setItem('authUser',token)
                }
            }

            // Devolver los datos de la respuesta (si es necesario)
            return response.json(); // O response.data si prefieres obtener los datos directamente
        } else {
            console.error('Error en la solicitud:', response.statusText);
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
    }
};

