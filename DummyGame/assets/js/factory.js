function randomInInterval(min, max) {
    return Math.random() * (max - min) + min;
}

function characterFactory(minAttackDamage, maxAttackDamage) {
    return {
        minAttackDamage,
        maxAttackDamage,
        health: 100,
        attack() {
            // returns the damage caused by the attack
            return Math.round(randomInInterval(this.minAttackDamage, this.maxAttackDamage));
        },
        takeDamage(damage) {
            this.health -= damage;
            if (this.health < 0) this.health = 0;
        }
    }
}


function playerFactory() {
    let player = characterFactory(5, 12);
    player.ultimateAttack = function() {
        // speacial attack that might deal more damage
        return this.attack() * 2;
    }
    player.heal = function() {
        // heals part of the player's health
        let value = Math.round(randomInInterval(player.minAttackDamage*1.5, player.maxAttackDamage*1.5));
        player.health += value;
        return value;
    }
    return player;
}


function monsterFactory() {
    let monster = characterFactory(8, 15);
    return monster;
}
