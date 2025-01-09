import { toast } from 'sonner'
import { AxiosError } from 'axios';

const StatusCode = (error:AxiosError<{ message: string }>) => {

    switch (error.status) {

        case 400:

        toast.error("Error al añadir compra", {
            className: "text-lg border border-primary shadow-cartoon-small-xs dark:shadow-cartoon-small-dark dark:border-black",
            description: "La identificación del cliente es obligatoria.",
            action: {
                label: "Listo",
                onClick: () => toast.dismiss(),
            },
            actionButtonStyle: {fontSize: "1rem", borderRadius: "0.4rem", padding: "1rem 1rem"},
            });

          break;

        case 428:

        toast.error("Error al añadir compra", {
            className: "text-lg border border-primary shadow-cartoon-small-xs dark:shadow-cartoon-small-dark dark:border-black",
            description: error.response?.data?.message,
            action: {
                label: "Listo",
                onClick: () => toast.dismiss(),
            },
            actionButtonStyle: {fontSize: "1rem", borderRadius: "0.4rem", padding: "1rem 1rem"},
            });

          break;

        case 500:

        toast.error("Error al añadir compra", {
            className: "text-lg border border-primary shadow-cartoon-small-xs dark:shadow-cartoon-small-dark dark:border-black",
            description: "Error al adicionar compra al cliente.",
            action: {
                label: "Listo",
                onClick: () => toast.dismiss(),
            },
            actionButtonStyle: {fontSize: "1rem", borderRadius: "0.4rem", padding: "1rem 1rem"},
            });
        
          break;
        default:
            toast.error("Error al añadir compra", {
                className: "text-lg border border-primary shadow-cartoon-small-xs dark:shadow-cartoon-small-dark dark:border-black",
                description: error.response?.data?.message,
                action: {
                    label: "Listo",
                    onClick: () => toast.dismiss(),
                },
                actionButtonStyle: {fontSize: "1rem", borderRadius: "0.4rem", padding: "1rem 1rem"},
                });
        break;
      }
}

export default StatusCode;