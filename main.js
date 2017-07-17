let p1, p2;
// p1 = [5, 1, 13, 10, 11, 3, 2, 10, 4, 12, 5, 11, 10, 5, 7, 6, 6, 11, 9, 6, 3, 13, 6, 1, 8, 1]
// p2 = [9, 12, 8, 3, 11, 10, 1, 4, 2, 4, 7, 9, 13, 8, 2, 13, 7, 4, 2, 8, 9, 12, 3, 12,7,5]
p1 = [3,11,6,12, 2, 13, 5, 7,10,3,10,4,12,11,1,13,12,2,1,7,10,6,12,5,8,1]
p2 = [9,10,7,9,5,2,6,1,11,11,7,9,3,4,8,3,4,8,8,4,6,9,13,2,13,5]


// p1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13]
// p2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13]
let msg = gameplay(p1, p2);
console.log(msg);

function gameplay(arr1, arr2) {
  if (!(arr1.length || arr2.length)) {
    return "A tie!"
  }
  else if(!arr1.length) {
    return "P2 wins!"
  }
  else if(!arr2.length) {
    return "P1 wins!"
  }

  let top1 = arr1.shift()
  let top2 = arr2.shift()

  if (top1 > top2) {
    arr1.push(top1, top2)
    console.log('Battle status: P1 won')
  }
  else if( top2 > top1) {
    arr2.push(top2, top1)
    console.log('Battle status: P2 won')
  }
  else {
    let pile = {
      p1: [],
      p2: [],
      t: [top1, top2]
    }

    war(arr1, arr2, pile)
  }
  return gameplay(arr1, arr2)
}

function war(arr1, arr2, pile) {
  if (!(arr1.length || arr2.length)) {
    return
  }
  let down1 = arr1.splice(0, 4)
  let down2 = arr2.splice(0, 4)

  let top1 = down1.pop()
  let top2 = down2.pop()


  if (top1 > top2) {
    arr1.push(...down1, top1, ...down2, top2, ...pile.p1, ...pile.p2, pile.t[0], pile.t[1])
    gameplay(arr1, arr2)
  }
  else if( top2 > top1) {
    arr2.push(...down2, top2, ...down1, top1, ...pile.p2, ...pile.p1, pile.t[1], pile.t[0])
    gameplay(arr1, arr2)
  }
  else {
    let newPile = Object.assign({}, {
      p1: [...down1, top1, ...down2, top2, ...pile.p1, ...pile.p2],
      p2: [...down2, top2, ...down1, top1, ...pile.p2, ...pile.p1],
      t: [...pile.t]
    })

    war(arr1, arr2, newPile)
  }
}
