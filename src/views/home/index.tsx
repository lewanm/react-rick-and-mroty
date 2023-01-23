import React,{ReactElement} from 'react';
import './styles.css'
import imagen from '../../assets/rikimartin.jpg'

type Props = {
    parentFunction: (event: React.MouseEvent<HTMLButtonElement>) => void
 }

export default function Home(props: Props ){
    const {parentFunction} = props
    return(
        <div className="container">
            <div className="button-container">
                <button className="main-button" onClick={parentFunction}>Ir a los personajes</button>
            </div>

            <img className="main-img" src={imagen} alt="" />
        </div>
    )
}