const pako = require('pako');
const xml = require(`xml2json`)
const fs = require(`fs`)

const objects = {
    "flight": {
        "type": "28",
        "x": "464",
        "y": "336",
        "event": [
            {
                "eventIndex": "17",
                "param": [
                    {
                        "key": "offset",
                        "val": "0"
                    },
                    {
                        "key": "frames",
                        "val": "1"
                    }
                ],
                "event": {
                    "eventIndex": "109"
                }
            },
            {
                "eventIndex": "1",
                "event": {
                    "eventIndex": "120",
                    "param": [
                        {
                            "key": "follow_player_type",
                            "val": "0"
                        },
                        {
                            "key": "axis",
                            "val": "3"
                        }
                    ]
                }
            }
        ],
        "param": [
            {
                "key": "solid",
                "val": "0"
            },
            {
                "key": "slots",
                "val": "1"
            },
            {
                "key": "angle",
                "val": "0"
            },
            {
                "key": "rotate_speed",
                "val": "0"
            },
            {
                "key": "scale",
                "val": "1"
            },
            {
                "key": "shot_speed",
                "val": "5"
            },
            {
                "key": "layer",
                "val": "2"
            },
            {
                "key": "track_player",
                "val": "0"
            }
        ],
        "obj": {
            "type": "23",
            "x": "177",
            "y": "258",
            "slot": "0",
            "event": [
                {
                    "eventIndex": "1",
                    "event": {
                        "eventIndex": "102",
                        "param": [
                            {
                                "key": "timer_number",
                                "val": "0"
                            },
                            {
                                "key": "frames",
                                "val": "1"
                            }
                        ]
                    }
                },
                {
                    "eventIndex": "2",
                    "param": {
                        "key": "timer_number",
                        "val": "0"
                    },
                    "event": {
                        "eventIndex": "103"
                    }
                }
            ],
            "param": [
                {
                    "key": "respawns",
                    "val": "1"
                },
                {
                    "key": "scale",
                    "val": "1"
                },
                {
                    "key": "layer",
                    "val": "2"
                }
            ]
        }
    },
    "invincibility": {
        "type": "28",
        "x": "464",
        "y": "336",
        "event": [
            {
                "eventIndex": "17",
                "param": [
                    {
                        "key": "offset",
                        "val": "0"
                    },
                    {
                        "key": "frames",
                        "val": "1"
                    }
                ],
                "event": {
                    "eventIndex": "109"
                }
            },
            {
                "eventIndex": "1",
                "event": {
                    "eventIndex": "120",
                    "param": [
                        {
                            "key": "follow_player_type",
                            "val": "0"
                        },
                        {
                            "key": "axis",
                            "val": "3"
                        }
                    ]
                }
            }
        ],
        "param": [
            {
                "key": "solid",
                "val": "0"
            },
            {
                "key": "slots",
                "val": "1"
            },
            {
                "key": "angle",
                "val": "0"
            },
            {
                "key": "rotate_speed",
                "val": "0"
            },
            {
                "key": "scale",
                "val": "1"
            },
            {
                "key": "shot_speed",
                "val": "5"
            },
            {
                "key": "layer",
                "val": "2"
            },
            {
                "key": "track_player",
                "val": "0"
            }
        ],
        "obj": {
            "type": "100",
            "x": "528",
            "y": "272",
            "slot": "0",
            "event": [
                {
                    "eventIndex": "1",
                    "event": {
                        "eventIndex": "102",
                        "param": [
                            {
                                "key": "timer_number",
                                "val": "0"
                            },
                            {
                                "key": "frames",
                                "val": "1"
                            }
                        ]
                    }
                },
                {
                    "eventIndex": "2",
                    "param": {
                        "key": "timer_number",
                        "val": "0"
                    },
                    "event": {
                        "eventIndex": "103"
                    }
                }
            ],
            "param": [
                {
                    "key": "scale",
                    "val": "1"
                },
                {
                    "key": "layer",
                    "val": "2"
                }
            ]
        }
    },
    "coins": {
        "type": "28",
        "x": "464",
        "y": "336",
        "event": [
            {
                "eventIndex": "17",
                "param": [
                    {
                        "key": "offset",
                        "val": "0"
                    },
                    {
                        "key": "frames",
                        "val": "1"
                    }
                ],
                "event": {
                    "eventIndex": "109"
                }
            },
            {
                "eventIndex": "1",
                "event": {
                    "eventIndex": "120",
                    "param": [
                        {
                            "key": "follow_player_type",
                            "val": "0"
                        },
                        {
                            "key": "axis",
                            "val": "3"
                        }
                    ]
                }
            }
        ],
        "param": [
            {
                "key": "solid",
                "val": "0"
            },
            {
                "key": "slots",
                "val": "2"
            },
            {
                "key": "angle",
                "val": "0"
            },
            {
                "key": "rotate_speed",
                "val": "0"
            },
            {
                "key": "scale",
                "val": "1"
            },
            {
                "key": "shot_speed",
                "val": "5"
            },
            {
                "key": "layer",
                "val": "2"
            },
            {
                "key": "track_player",
                "val": "0"
            }
        ],
        "obj": [
            {
                "type": "51",
                "x": "464",
                "y": "288",
                "slot": "0",
                "event": [
                    {
                        "eventIndex": "1",
                        "event": {
                            "eventIndex": "102",
                            "param": [
                                {
                                    "key": "timer_number",
                                    "val": "0"
                                },
                                {
                                    "key": "frames",
                                    "val": "1"
                                }
                            ]
                        }
                    },
                    {
                        "eventIndex": "2",
                        "param": {
                            "key": "timer_number",
                            "val": "0"
                        },
                        "event": {
                            "eventIndex": "103"
                        }
                    }
                ],
                "param": [
                    {
                        "key": "scale",
                        "val": "1"
                    },
                    {
                        "key": "layer",
                        "val": "2"
                    }
                ]
            },
            {
                "type": "108",
                "x": "480",
                "y": "288",
                "slot": "1",
                "event": [
                    {
                        "eventIndex": "1",
                        "event": {
                            "eventIndex": "102",
                            "param": [
                                {
                                    "key": "timer_number",
                                    "val": "0"
                                },
                                {
                                    "key": "frames",
                                    "val": "1"
                                }
                            ]
                        }
                    },
                    {
                        "eventIndex": "2",
                        "param": {
                            "key": "timer_number",
                            "val": "0"
                        },
                        "event": {
                            "eventIndex": "103"
                        }
                    }
                ],
                "param": [
                    {
                        "key": "scale",
                        "val": "1"
                    },
                    {
                        "key": "layer",
                        "val": "2"
                    }
                ]
            }
        ]
    },
}


module.exports = (mapData, mods)=>{
    let strData     = atob(mapData);
    let charData    = strData.split('').map(function(x){return x.charCodeAt(0);});
    let binData     = new Uint8Array(charData);
    let data        = pako.inflate(binData);
    let decoded     = new Uint16Array(data);

    fs.writeFileSync(`./raw2`, decoded)

    let map = JSON.parse(xml.toJson(decoded.slice(0,-1),
        {
            "object": false,
            "coerce": false,
            "reversible": true,
            "sanitize": false
        }
    ))

    let rooms = map.sfm_maps.sfm_map[0] ? map.sfm_maps.sfm_map : [map.sfm_maps.sfm_map]

    rooms.forEach((r, i) => {
        let room = map.sfm_maps.sfm_map[0] ? map.sfm_maps.sfm_map[i] : map.sfm_maps.sfm_map;

        if(mods["LEVEL_FLIGHT"].enabled) room.objects.object.push(objects.flight);
        if(mods["LEVEL_COINS"].enabled) room.objects.object.push(objects.coins);
        if(mods["LEVEL_SHIELD"].enabled) room.objects.object.push(objects.invincibility);

        room.head["num_objects"].$t = room.objects.object.length
    });

    let reXML = xml.toXml(map, {
        sanitize: false
    })
    fs.writeFileSync(`./raw`, reXML.replaceAll(`></param>`, `/>`))
    let enc = pako.deflate(reXML.replaceAll(`></param>`, `/>`) + " ")
    let out = btoa(String.fromCharCode.apply(null, enc))

    return out
}