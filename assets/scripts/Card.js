class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, value) {
    super(scene, 0, 0, 'card');
    this.scene = scene;
    this.value = value;
    this.setOrigin(0.5, 0.5);          //позиционирование спрайта относительно центра спрайта
    this.scene.add.existing(this);
    this.setInteractive();            // установка интерактивности спрайта
    // this.on('pointerdown', this.open, this); // установка события на клик для одного спрайта. В данный момент не нужен, поскольку устанавливается gameobjectdown для всех спрайтов в GameScene
    this.opened = false;       
  }

  init(position) {
    this.position = position;         
    this.close();
    this.setPosition(-this.width, -this.height);                     // метод Phaser для спрайтов, задаем позицию карт за экраном, для анимации вылета карт
  }

  move(params) {
    this.scene.tweens.add({          //анимация спрайтов
      targets: this,
      x: params.x,
      y: params.y,
      delay: params.delay,                   //задержка
      ease: 'Linear',
      duration: 250,
      onComplete: () => {
        if(params.callback) {
          params.callback();
        }
      }
    });

    // this.setPosition(params.x, params.y);                 // метод Phaser для спрайтов, задаем позицию карт за экраном, для анимации вылета карт
  }

  flip(callback) {
    this.scene.tweens.add({          //анимация спрайтов
      targets: this,
      scaleX: 0,
      ease: 'Linear',
      duration: 150,
      onComplete: () => {
        this.show(callback);
      }
    });
  } 

  show(callback) {
    let texture = this.opened ? 'card' + this.value : 'card';
    this.setTexture(texture);      
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      ease: 'Linear',
      duration: 150,
      onComplete: () => {
        if(callback) {
          callback();
        };
      }
    });
  }

  open(callback) {
    this.opened = true;
    this.flip(callback);    
  }

  close() {
    if (this.opened) {
      this.opened = false;
      this.flip();  
    }     
  }
}