import { HeaderStyled, Horario } from "./styledHeader"
import batery from "../../icons/batery.png"
import signal from "../../icons/signal.png"
import Light from "../../icons/Light.png"
import hour from "../../icons/hour.png"

export const Header = () => {
    return (
        <HeaderStyled>
            <Horario className="hour" src={hour} />
            <img className="signal" src={signal} />
            <img className="Light" src={Light} />
            <img className="batery" src={batery} />
        </HeaderStyled>
    )
}