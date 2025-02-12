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
import { Label } from "@/components/ui/label";
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
                    <CardTitle>Rest and Relax</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="music">Select Music</Label>
                                <Select onValueChange={handleMusicChange}>
                                    <SelectTrigger id="music">
                                        <SelectValue placeholder="Select a music" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="/music/Die_With_A_Smile.mp3">Music 1</SelectItem>
                                        <SelectItem value="/music/music2.mp3">Music 2</SelectItem>
                                        <SelectItem value="/music/music3.mp3">Music 3</SelectItem>
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
                </CardFooter>
            </Card>
        </div>
    );
}