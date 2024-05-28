
const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('es-ES', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');

    return `${day} ${month}, ${year} ${formattedHours}:${minutes} ${ampm}`;
};

interface Props {
    createdAt?: Date;
    updatedAt?: Date
}

export const CreatedAndUpdated = ({ createdAt, updatedAt }: Props) => (
    createdAt &&
    <div className="flex flex-col md:flex-row gap-1 text-xs text-muted-foreground font-light">
        <span>{formatDate(createdAt)}</span>
        <span className="hidden md:inline-flex">|</span>
        {
            updatedAt &&
            <span> Actualizado: {formatDate(updatedAt)} AR</span>
        }
    </div>
);
