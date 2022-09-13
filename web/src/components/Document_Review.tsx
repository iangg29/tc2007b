// (c) Tecnologico de Monterrey 2022, rights reserved.
import {
    AiFillFile,
    AiFillEye 
} from 'react-icons/ai'

const Document_Review = () => {
    return (
        <div className="w-full flex space-x-4 pt-2">
            <AiFillFile size={30} color="#252d53"/>
            <p>File_name.pdf</p>
            <p>09/09/2022</p>
            <AiFillEye size={30} color="#252d53"/>
        </div>
    );
};

export default Document_Review;
