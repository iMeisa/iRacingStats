import {useState} from "react";

export default function IpFetch(): [string, boolean] {
    const [ip, setIp] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    fetch('https://api.ipify.org/?format=json', )
        .then(res => res.json())
        .then(data => setIp(data['ip'] as string))
        .finally(() => setLoading(false) )

    return [ip, loading]
}
