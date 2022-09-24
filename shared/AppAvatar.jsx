import Image from "next/image"

export const AppAvatar = ({src, weight='normal', alt='avatar image'}) => {

    let dim = 45;
    if (weight == 'large'){
        dim = 65;
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