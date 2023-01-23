import React,{ReactElement} from 'react';

type Props = {
    parentFunction: (event: React.MouseEvent<HTMLButtonElement>) => void
 }

export default function Home(props: Props ){
    const {parentFunction} = props
    return(
        <div>
            <button onClick={parentFunction}>Ir a los personajes</button>
        </div>
    )
}