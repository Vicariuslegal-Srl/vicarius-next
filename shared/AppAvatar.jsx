import Image from "next/image"

export const AppAvatar = ({src, weight='normal', alt='avatar image'}) => {

    let dim = 65;
    if (weight == 'large'){
        dim = 95;
    }
    if (weight == 'small'){
        dim = 45;
    }

    return <div className={'app-avatar ' + weight}>
        <Image
            src={src}
            alt={alt}
            width={dim}
            height={dim}
        />
    </div>

}