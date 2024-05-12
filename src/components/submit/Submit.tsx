import { useFormStatus } from 'react-dom';
import style from './submit.module.scss';

export default function Submit() {

    const { pending } = useFormStatus();

    return(
        <button className={`${style["submit"]}`} disabled={pending}>Submit</button>
    );
}