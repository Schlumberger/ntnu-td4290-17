const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

const filepath = path.join(__dirname, '..', 'data', 'geometry.svg');

fs.readFile(filepath, function(err, data) {
  parser.parseString(data, function(err, result) {
    const res = parseSVG(result.svg.g);
    console.log(JSON.stringify(res, null, 2));
  });
});

const parseSVG = data => {
  return data.reduce((accGroup, group) => {
    return accGroup.concat(
      Object.keys(group).reduce((acc, lineType) => {
        if (lineType === '$') return acc;
        return acc.concat(parse(lineType, group[lineType], group.$.id));
      }, [])
    );
  }, []);
};

const parse = (lineType, data, type) => {
  switch (lineType) {
    case 'polyline':
      return data.map(line => parsePolyline(line, type));
    case 'line':
      return data.map(line => parseLine(line, type));
  }
};

const parsePolyline = (data, type) => {
  return {
    id: data.$.id,
    type: type,
    points: parsePolylinePoints(data.$.points)
  };
};

const parseLine = (data, type) => {
  return {
    id: data.$.id,
    type: type,
    points: [
      { x: Number(data.$.x1), y: Number(data.$.y1) },
      { x: Number(data.$.x2), y: Number(data.$.y2) }
    ]
  };
};

const parsePolylinePoints = points => {
  const pieces = points.split(' ');
  let coords = [];

  for (let i = 0; i + 1 < pieces.length; i += 2) {
    coords.push({
      x: Number(pieces[i]),
      y: Number(pieces[i + 1])
    });
  }
  return coords;
};
