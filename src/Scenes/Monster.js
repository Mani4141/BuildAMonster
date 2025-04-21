class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        // Load sprite atlas
        this.load.setPath("./assets/");
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");

        // Legs
        my.sprite.leftLeg = this.add.sprite(this.bodyX - 50, this.bodyY + 110, "monsterParts", "leg_blueD.png");
        my.sprite.rightLeg = this.add.sprite(this.bodyX + 50, this.bodyY + 130, "monsterParts", "leg_greenA.png");
        my.sprite.leftLeg.flipX = true;

        // Arms
        my.sprite.leftArm = this.add.sprite(this.bodyX - 90, this.bodyY + 50, "monsterParts", "arm_greenB.png");
        my.sprite.rightArm = this.add.sprite(this.bodyX + 90, this.bodyY + 50, "monsterParts", "arm_blueB.png");
        my.sprite.leftArm.flipX = true;

        // Eye
        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY - 50, "monsterParts", "eye_yellow.png");

        // Mouth/Fangs 
        my.sprite.smile = this.add.sprite(this.bodyX, this.bodyY + 20, "monsterParts", "mouthA.png");
        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY + 20, "monsterParts", "mouthJ.png");
        my.sprite.fangs.setVisible(false); 

        // Head accessories
        my.sprite.horn = this.add.sprite(this.bodyX + 60, this.bodyY - 70, "monsterParts", "detail_white_horn_large.png");
        my.sprite.antenna = this.add.sprite(this.bodyX - 60, this.bodyY - 85, "monsterParts", "detail_yellow_antenna_large.png");
        my.sprite.antenna.flipX = true;

        this.monsterParts = Object.values(my.sprite);

 
        this.input.keyboard.on('keydown-S', () => {
            my.sprite.smile.setVisible(true);
            my.sprite.fangs.setVisible(false);
        });
    
        this.input.keyboard.on('keydown-F', () => {
            my.sprite.smile.setVisible(false);
            my.sprite.fangs.setVisible(true);
        });
    
        this.cursors = this.input.keyboard.addKeys({
            left: 'A',
            right: 'D'
        });
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        let speed = 2;

        if (this.cursors.left.isDown) {
            this.monsterParts.forEach(part => part.x -= speed);
        } else if (this.cursors.right.isDown) {
            this.monsterParts.forEach(part => part.x += speed);
        }
       
    }

}