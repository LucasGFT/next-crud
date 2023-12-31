
interface BotaoProps {
    children: any;
    cor?: 'green' | 'blue' | 'gray';
    className?: string;
    onClick?: () => void;
}

export default function Botao(props: BotaoProps) {

    return (
        <button onClick={props.onClick} className={`bg-gradient-to-r from-${props.cor || 'gray'}-400 to-${props.cor || 'gray'}-700 text-white px-4 py-2 rounded-md ${props.className}`}>
            {props.children}
        </button>
    )
}
