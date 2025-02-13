"use client"
import { SetStateAction, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import styles from './page.module.css';

export default function CardWithForm() {
    const [selectedMusic, setSelectedMusic] = useState('');

    const handleMusicChange = (value: SetStateAction<string>) => {
        setSelectedMusic(value);
    };

    const playMusic = () => {
        const audioElement = document.getElementById('musicPlayer');
        if (audioElement) {
            audioElement.src = selectedMusic;
            audioElement.play();
        }
    };

    return (
        <div className={styles.container}>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Rest and Relax🎶🎼</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Select onValueChange={handleMusicChange}>
                                    <div>
                                        <img src="/photo/cute.jpg" />
                                    </div>


                                    <SelectTrigger id="music">
                                        <SelectValue placeholder="Select a music" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="/music/14CM..mp3">14 CM</SelectItem>
                                        <SelectItem value="/music/NoOne.mp3">วันที่นาฬิกาของเราหมุนไปพร้อมกัน</SelectItem>
                                        <SelectItem value="/music/Sunsets_With_You.mp3">Sunsets With You</SelectItem>
                                        <SelectItem value="/music/ClariS.mp3">Hitorigoto </SelectItem>

                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                    <audio id="musicPlayer" controls className={styles.audioPlayer}>
                        Your browser does not support the audio element.
                    </audio>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={playMusic}>Play</Button>
                    <Button
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            borderColor: 'blue',
                        }}
                        variant="outline"
                        onClick={() => window.location.href = "/end"}
                    >
                        Next station!
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}