new Vue({
    el: "#app",
    data: {
        player: playerFactory(),
        monster: monsterFactory(),
        buttons: [
            { color: '#d45f5f', text:  'attack', actionFnName: 'attackRound' },
            { color: '#9954d6', text:  'ultimate attack', actionFnName: 'ultimateRound' },
            { color: '#6fd45f', text:  'heal', actionFnName: 'healRound' },
            { color: 'gray', text:  'reset', actionFnName: 'resetGame' },
        ],
        logs: [],
    },
    methods: {
        actionFnCaller(fnName) {
            this[fnName]();
        },
        playerAttack(ultimate) {
            let damage = ultimate ? this.player.ultimateAttack() : this.player.attack();
            this.monster.takeDamage(damage);
            this.logs.push({
                origin: 'player',
                message: `player has dealt ${damage} to the monster` 
            });
        },

        playerHeal() {
            let value = this.player.heal();
            this.logs.push({
                origin: 'player',
                message: `player gained ${value} health` 
            });
        },

        monsterAttack() {
            let damage = this.monster.attack();
            this.player.takeDamage(damage);
            this.logs.push({
                origin: 'monster',
                message: `monster has dealt ${damage} to the player` 
            });
        },

        attackRound() {
            this.playerAttack(false);
            if (this.monster.health > 0) this.monsterAttack();
        },

        ultimateRound() {
            this.playerAttack(true);
            if (this.monster.health > 0) this.monsterAttack();
        },

        healRound() {
            this.playerHeal();
            this.monsterAttack();
        },

        resetGame() {
            this.player = playerFactory();
            this.monster = monsterFactory();
            this.logs = [];
            this.finished = false;
        }
    },
    computed: {
        playerHealthBarStyle() {
            return {
                width: `${this.player.health}%`,
                backgroundColor: this.player.health <= 20 ? 'red' : 'green'
            }
        },

        monsterHealthBarStyle() {
            return {
                width: `${this.monster.health}%`,
                backgroundColor: this.monster.health <= 20 ? 'red' : 'green'
            }
        },

        orderedLogs() {
            return [...this.logs].reverse();
        },

        finished() {
            return this.player.health <= 0 || this.monster.health <= 0
        },
    }
})