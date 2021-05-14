import React from 'react'

export const HeartNav=()=>{
    return (
        <div class="sidenav">
                <ul>
                    <li>Age in years</li>
                    <li>Sex <br></br>
                        1:Male <br></br>
                        0:Female </li>
                    <li> Chest Pain Type<br></br>
                      Value 1: typical angina<br></br>
                      Value 2: a typical angina<br></br>
                      Value 3: non-anginal pain<br></br>
                      Value 4: asymptomatic<br></br>
                    </li>
                    <li>Exercise angina <br></br>
                        1:Yes <br></br>
                        0:No
                      </li>
                    <li>Thal <br></br>
                      3 = normal <br></br>
                      6 = fixed defect <br></br>
                      7 = reversable defect <br></br>
                    </li>
                </ul>
            </div>
    )
}