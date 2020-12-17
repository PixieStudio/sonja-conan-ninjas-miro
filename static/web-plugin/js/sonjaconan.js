function createImage(canvasX, canvasY, url, type) {
    return miro.board.widgets.create({
        type: 'image',
        url: url,
        x: canvasX,
        y: canvasY,
        metadata: {
            [APP_ID]: {
                type: type
            }
        }
    })
}

async function techniquesNinja(canvasX, canvasY) {
    //nombre de tech = 12
    let rollTech = Math.floor(Math.random() * Math.floor(12) + 1)
    let allTech = await miro.board.widgets.get({ type: 'image', metadata: { [APP_ID]: { tech: rollTech } } })
    let maxTech = await miro.board.widgets.get({ type: 'image', metadata: { [APP_ID]: { max: '12' } } })

    if (maxTech.length == 12) {
        miro.board.widgets.create({
            type: 'image',
            url: `${APP_URL}/img/${img}/cartes/maxtech.svg`,
            x: canvasX,
            y: canvasY
        })
    } else if (allTech.length == 0) {
        miro.board.widgets.create({
            type: 'image',
            metadata: {
                [APP_ID]: {
                    tech: rollTech,
                    max: '12'
                }
            },
            url: `${APP_URL}/img/${lang}/cartes/${rollTech}.svg`,
            x: canvasX,
            y: canvasY
        })
    } else {
        techniquesNinja(canvasX, canvasY)
    }
}

function rollBarbare() {
    let rollBarbare = Math.floor(Math.random() * Math.floor(6) + 1)
    return rollBarbare.toString()
}

async function barbareDes(type) {
    let txtType = await miro.board.widgets.get({ type: 'shape', metadata: { [APP_ID]: { type: type } } })

    if (txtType.length > 1) {
        deleteTxt(type)
        createTxt(type)
    } else if (txtType.length == 1) {
        updateTxt(type)
    } else {
        createTxt(type)
    }
}

async function deleteTxt(type) {
    let deleteBox = await miro.board.widgets.get({ type: 'shape', metadata: { [APP_ID]: { type: type } } })
    for (let i = deleteBox.length - 1; i > -1; i--) {
        await miro.board.widgets.deleteById({ id: deleteBox[i].id })
    }
}

function boxPosX(type, referer) {
    let modX = 0
    if (type == "mots") {
        modX = 890
    } else if (type == "phrases") {
        modX = 740
    }
    return referer[0].x - modX
}

function boxPosY(type, referer) {
    let modY = 100
    if (type == "mots") {
        modX = 890
    } else if (type == "phrases") {
        modX = 740
    }
    return referer[0].y + modY
}

async function updateTxt(type) {
    let selectTapis = await miro.board.widgets.get({ type: 'image', metadata: { [APP_ID]: { type: "tapis" } } })
    let updateBox = await miro.board.widgets.get({ type: 'shape', metadata: { [APP_ID]: { type: type } } })

    miro.board.widgets.bringForward(updateBox)
    miro.board.widgets.update({
        id: updateBox[0].id,
        text: rollBarbare(),
        x: boxPosX(type, selectTapis),
        y: boxPosY(type, selectTapis)
    })
}

async function createTxt(type) {
    let selectTapis = await miro.board.widgets.get({ type: 'image', metadata: { [APP_ID]: { type: "tapis" } } })
    let selectBox = await miro.board.widgets.get({ type: 'shape', metadata: { [APP_ID]: { type: type } } })

    if (selectTapis.length == 1 && selectBox.length == 0) {
        await miro.board.widgets.create({
            type: "shape",
            capabilities: {
                editable: false
            },
            x: boxPosX(type, selectTapis),
            y: boxPosY(type, selectTapis),
            width: 130,
            height: 100,
            metadata: {
                [APP_ID]: {
                    type: type,
                }
            },
            style: {
                shapeType: 3,
                backgroundColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                textAlign: "c",
                textAlignVertical: "m",
                bold: 1,
                fontSize: 64
            },
            text: rollBarbare()
        })
    }

}

