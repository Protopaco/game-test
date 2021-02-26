

export default function checkCollision(objectArray, proposedMove, playerDimension) {
    console.log(objectArray);
    console.log(proposedMove);
    let returnValue = true;
    for (const object of objectArray) {
        const { position, dimension } = object;

        if (position.y < proposedMove.y + playerDimension.y) {
            // top of object higher than bottom of player
            console.log('if block 1');

            if (position.y + dimension.y > proposedMove.y) {
                // bottom of object lower than top of player
                console.log('if block 2');

                if (position.x < proposedMove.x + playerDimension.x) {
                    // left of object to the left of the left of the player
                    console.log('if block 3');

                    if (position.x + dimension.x > proposedMove.x) {
                        // right of object to the right of the right of the player
                        console.log('if block 4');

                        returnValue = false;
                    }
                }
            }
        }
    }
    console.log(returnValue);
    return returnValue;
}
