import PropTypes from 'prop-types'
import { isInteger } from 'ramda-adjunct'
import React from 'react'

import { typeConfig, typeGridSquare } from '../../../prop-types'
import getCanvasApi from '../../../utils/getCanvasApi'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const Canvas = ({
  setCanvas,
  width,
  height,
  coonsPatch,
  gridSquare,
  config = undefined,
}) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current) {
      setCanvas(ref.current)
    }
  }, [setCanvas])

  React.useLayoutEffect(() => {
    if (coonsPatch) {
      const canvasContext = ref.current.getContext(`2d`)
      const canvasApi = getCanvasApi(canvasContext)
      canvasApi.clearCanvas(ref.current)
      canvasApi.drawCoonsPatch(coonsPatch, {
        shouldDrawBounds: config.bounds.shouldDrawBounds,
        shouldDrawIntersections: config.grid.shouldDrawIntersections,
      })

      if (gridSquare && isInteger(gridSquare.x) && isInteger(gridSquare.y)) {
        const gridSquareBounds = coonsPatch.getCellBounds(
          gridSquare.x,
          gridSquare.y
        )
        canvasApi.drawGridSquareBounds(gridSquareBounds)
      }
    }
  }, [coonsPatch, gridSquare, config, width, height])

  return (
    <div>
      <canvas
        id="canvas"
        className="relative border border-black"
        ref={ref}
        width={width}
        height={height}
      />
      <div className="absolute bottom-2 left-3 text-xs text-gray-400">
        {width} x {height}
      </div>
    </div>
  )
}

Canvas.propTypes = {
  setCanvas: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  coonsPatch: PropTypes.object,
  gridSquare: typeGridSquare,
  config: typeConfig,
}

export default Canvas
