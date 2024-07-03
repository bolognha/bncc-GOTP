let engine;
let world;
let ground;
let polygons = [];
let str_n = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Matter.Engine.create();
  world = engine.world;
  engine.world.gravity.scale = 0.002;

  let groundOptions = {
    isStatic: true,
  };
  ground = Matter.Bodies.rectangle(
    width / 2,
    height - 10,
    width,
    20,
    groundOptions
  );
  Matter.World.add(world, ground);
}

function draw() {
  background(20);

  //if (frameCount % 15 == 0) mousePressed(width/2, 1);

  Matter.Engine.update(engine);

  fill(170);
  noStroke();
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width, 20);

  for (let i = polygons.length - 1; i >= 0; i--) {
    let polygon = polygons[i];

    push();
    translate(polygon.position.x, polygon.position.y);
    rotate(polygon.angle);
    // circle(0, 0, polygon.radius * 2);
    textAlign(CENTER, CENTER);
    fill(255);
    noStroke();
    textFont("serif");
    textSize(polygon.radius * 2);
    text(polygon.string, 0, 0);
    pop();

    if (polygon.position.y > height) {
      Matter.World.remove(world, polygon);
      polygons.splice(i, 1);
    }
  }
}

function mousePressed() {
  let sides = int(random(3, 8));
  let radius = random(20, 50);
  let angle = (random(TWO_PI) / 180) * (random() > 0.5 ? -1 : 1);
  let options = {
    restitution: 0.1,
  };
  let polygon = Matter.Bodies.circle(mouseX, mouseY, radius, options);
  polygon.angle = angle;
  polygon.string = random(str);
  polygon.radius = radius;

  Matter.World.add(world, polygon);
  polygons.push(polygon);
  //polygons.pop();
}

let str =
  ['Valorização', 'Diversidade', 'Autonomia', 'Significativa', 'Habilidades', 'Consciente', 'Desenvolvimento', 'Prática', 'Resiliência', 'Intercultural', 'Saberes', 
    'Valores', 'Flexível', 'Inclusão', 'Cidadania', 'Democrática', 'Protagonismo', 'Criatividade', 'Imaginação', 'Reflexão']
