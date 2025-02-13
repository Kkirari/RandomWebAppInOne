"use client"
import {
    Card,
} from "@/components/ui/card"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './Page.module.css';
import { Button } from "@/components/ui/button";

const SIZE = 3; // ขนาดของกระดาน 3x3
const imgFolder = '/photo/cut_images/';
const imgOrder = [
    "image_part_001", "image_part_002", "image_part_003",
    "image_part_004", "image_part_005", "image_part_006",
    "image_part_007", "image_part_008", "image_part_009"
];

// const shuffle = (array: number[]) => {
//     const fixedBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // ลำดับที่ถูกต้องของกระดาน 3x3
//     [fixedBoard[7], fixedBoard[8]] = [fixedBoard[8], fixedBoard[7]]; // เปลี่ยนตำแหน่ง 8 กับ 7
//     return fixedBoard;
// };
const shuffle = (array: number[]) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


const SlidingPuzzle = () => {
    const [tiles, setTiles] = useState<number[]>([]);
    const [emptyTileIndex, setEmptyTileIndex] = useState<number>(8);
    const [won, setWon] = useState<boolean>(false);

    useEffect(() => {
        const initialTiles = shuffle([...Array(SIZE * SIZE).keys()]);
        setTiles(initialTiles);
        setEmptyTileIndex(initialTiles.indexOf(8));
    }, []);

    const isValidMove = useCallback((index: number) => {
        const emptyRow = Math.floor(emptyTileIndex / SIZE);
        const emptyCol = emptyTileIndex % SIZE;
        const tileRow = Math.floor(index / SIZE);
        const tileCol = index % SIZE;
        return (Math.abs(emptyRow - tileRow) + Math.abs(emptyCol - tileCol) === 1);
    }, [emptyTileIndex]);

    const handleClick = useCallback((index: number) => {
        if (isValidMove(index)) {
            const newTiles = [...tiles];
            newTiles[emptyTileIndex] = newTiles[index];
            newTiles[index] = 8;
            setTiles(newTiles);
            setEmptyTileIndex(index);
            checkWin(newTiles);
        }
    }, [tiles, emptyTileIndex, isValidMove]);

    const checkWin = useCallback((tiles: number[]) => {
        const correctOrder = [...Array(SIZE * SIZE).keys()];
        if (JSON.stringify(tiles) === JSON.stringify(correctOrder)) {
            setWon(true);
        }
    }, []);

    const resetGame = useCallback(() => {
        const initialTiles = shuffle([...Array(SIZE * SIZE).keys()]);
        setTiles(initialTiles);
        setEmptyTileIndex(initialTiles.indexOf(8));
        setWon(false);
    }, []);

    const puzzleTiles = useMemo(() => tiles.map((tile, index) => (
        <div key={index}
            className={`${styles.puzzleTile} ${tile === 8 ? styles.empty : ''}`}
            style={{ backgroundImage: tile === 8 ? 'none' : `url(${imgFolder}${imgOrder[tile]}.jpg)` }}
            onClick={() => handleClick(index)}>
        </div>
    )), [tiles, handleClick]);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.winMessage}>Let try this! 🧠🤯</h1>
                <Card className={styles.wrapper}>
                    <div className={styles.puzzleContainer}>
                        {puzzleTiles}
                    </div>
                </Card>
                {won && <h1 className={styles.winMessage}>WOW You so great!!!!</h1>}
                {won && <Button onClick={() => window.location.href = "/song"} className={styles.button} variant="outline">Next level</Button>}
                <Button className={styles.button} variant="outline" onClick={resetGame}>Reset Game</Button>
            </div>
        </div>


    );
};

export default SlidingPuzzle;