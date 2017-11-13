## *Déjà vu*
Log grouping and replay for Prajna

### Installation
```shell
npm install --save prajna-dejavu
```

### Usage
```javascript
import Dejavu from 'prajna-dejavu';

// ...

let prajna = Prajna.init({
    pageId: 'you-name-it',
    channel: 'web',
});

prajna.use(Dejavu);

prajna.start();
```
