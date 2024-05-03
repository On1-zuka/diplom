import error from '../../assets/Error/404.jpg'


export default function ErrorPage(){
    return(
        <div>
            <img src={error} alt="Картинка с ошибкой" />
        </div>
    )
}