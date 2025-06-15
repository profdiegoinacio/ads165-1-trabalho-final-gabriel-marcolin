"use client";

import { useEffect, useState } from "react";
import {getMediaAvaliacao} from "@/api/fetchAvaliacoes";


interface Props {
    servicoId: number;
}

export default function MediaAvaliacao({ servicoId }: Props) {
    const [media, setMedia] = useState<number | null>(null);

    useEffect(() => {
        const carregar = async () => {
            try {
                const valor = await getMediaAvaliacao(servicoId);
                setMedia(valor);
            } catch {
                setMedia(null);
            }
        };
        carregar();
    }, [servicoId]);

    return (
        <span>
      {media !== null ? `${media.toFixed(1)} ⭐` : "Sem avaliações"}
    </span>
    );
}