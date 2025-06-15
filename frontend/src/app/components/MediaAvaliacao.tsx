"use client";

import { useEffect, useState } from "react";
import {getMediaAvaliacao} from "@/api/fetchAvaliacoes";


interface Props {
    servicoId: number;
    atualizar: number;
}

export default function MediaAvaliacao({ servicoId, atualizar }: Props) {
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
    }, [servicoId, atualizar]);

    return (
        <span>
      {media !== null ? `${media.toFixed(1)} ⭐` : "Sem avaliações"}
    </span>
    );
}