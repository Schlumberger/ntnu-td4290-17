function squiglifyLine(lineData) {
    const offset=4;
    const result = [];
    let placement = 1;
    for(let i=0; i<lineData.length-1; i++) {
        let y=lineData[i].y;
        let x=lineData[i].x;
        const dx = lineData[i+1].x-lineData[i].x;
        const dy = lineData[i+1].y-lineData[i].y;
        const length = Math.sqrt(dx*dx+dy*dy);
        const sx=(dx/length)*offset, sy=(dy/length)*offset;
        while(x <= lineData[i+1].x && x>=lineData[i].x) {
            result.push({x:x-placement*sy, y:y+placement*sx});
            x+=sx; y+=sy;
            placement*=-1;
        }
    }
    return result;
}