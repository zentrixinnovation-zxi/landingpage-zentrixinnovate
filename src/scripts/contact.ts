import Swal from "sweetalert2";

export default function setupContactForm(): void {
  const form = document.getElementById("contactForm") as HTMLFormElement | null;

  if (!form) return;

  form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLInputElement).value,
    };

    Swal.fire({
      title: "Enviando...",
      text: "Por favor espera",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await fetch(
        "https://nodemailer-zentrixinnovate.onrender.com/api/send-message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Mensaje enviado!",
          text: "Nos pondremos en contacto contigo pronto 🚀",
          confirmButtonColor: "#2563eb", // azul Tailwind
        });
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "No se pudo enviar el mensaje",
          confirmButtonColor: "#dc2626", // rojo Tailwind
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Problema de conexión",
        text: "No se pudo conectar con el servidor",
        confirmButtonColor: "#f59e0b", // amarillo Tailwind
      });
    }
  });
}
