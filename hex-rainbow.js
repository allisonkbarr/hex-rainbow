// Helpers

var cleanUpHex = function(rawStr) {
  var str = rawStr[0] === '#' ? rawStr.slice(1) : rawStr

  var hexRegex = /^[\da-f]+$/
  var isOnlyHex = hexRegex.test(str)

  var isHalf = str.length === 3
  var isFull = str.length === 6

  var isHex = isOnlyHex && (isHalf || isFull)

  if (!isHex) {
    console.log('Please enter a valid hex value.')
    return
  }

  return isHalf ? str + str : str
}

var toRgb = function(str) {
  return parseInt(str, 16)
}

var toHex = function(num) {
  return num.toString(16)
}

var hexfromRgb = function(arr) {
  var hexArr = arr.map(toHex)
  return '#' + hexArr[0] + hexArr[1] + hexArr[2]
}

var incrementer = function(current, target) {
  if (current === target) return
  return current < target ? current + 1 : current - 1
}

// Main function

var rainbowMaker = function(rawHex1, rawHex2) {

  var hex1 = cleanUpHex(rawHex1)
  var hex2 = cleanUpHex(rawHex2)

  var startRgb = [toRgb(hex1.slice(0,2)), toRgb(hex1.slice(2,4)), toRgb(hex1.slice(4,6))]
  var endRgb = [toRgb(hex2.slice(0,2)), toRgb(hex2.slice(2,4)), toRgb(hex2.slice(4,6))]

  var rgbPairs = startRgb.map(function(_, i) {
    return [startRgb[i], endRgb[i]]
  })

  var steps = rgbPairs.reduce(function(accum, arr) {

    var current = arr[0]
    var target = arr[1]
    var steps = []
    var next;

    if (current === target) return steps

    while (current || current === 0) {
      next = incrementer(current, target)
      steps.push(next)
      current = next
    }

    return accum.concat([ steps ])
  }, [])

  var cache = []
  var zippedSteps = steps[0].map(function(_, i) {
    return [
      (steps[0][i] && (cache[0] = steps[0][i])) || cache[0],
      (steps[1][i] && (cache[1] = steps[1][i])) || cache[1],
      (steps[2][i] && (cache[2] = steps[2][i])) || cache[2],
    ]
  })

  console.log('zipped', zippedSteps.map(hexfromRgb))
}

rainbowMaker('ff0000', '1111ff')
