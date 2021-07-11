/* eslint-disable camelcase */
import moveMissingSvgVersion from './utils/tools/filesManagment'
import { FILES_PATHS } from './common/constants'

const { FILLED_SVG, OUTLINED_SVG } = FILES_PATHS

module.exports = function (grunt) {
  // Append path to your svg below
  // Extended set svg path
  const icons_to_download = (grunt.option('extended_src') !== undefined) ? grunt.option('extended_src') : '/'
  // suffix dist option if available
  const dist_folder_name = (grunt.option('dist') !== undefined) ? (`dist_${grunt.option('dist')}`) : 'dist'

  const generateOutlined = grunt.option('outlined')

  grunt.initConfig({
    webfont: {
      icons: {
        src: icons_to_download,
        dest: `temp/${dist_folder_name}/fonts`,
        destCss: `temp/${dist_folder_name}/css`,
        options: {
          font: `${generateOutlined ? 'eos-icons-outlined' : 'eos-icons'}`,
          syntax: 'bootstrap',
          version: '1.0.0',
          ligatures: true,
          normalize: false,
          types: 'woff2,woff,ttf,svg,eot',
          metadata: 'something here',
          templateOptions: {
            baseClass: `${generateOutlined ? 'eos-icons-outlined' : 'eos-icons'}`,
            classPrefix: 'eos-',
            template: `${generateOutlined ? 'templates/css-template-outlined.css' : 'templates/css-template.css'}`,
            iconsStyles: false
          },
          stylesheets: ['css'],
          destHtml: `temp/${dist_folder_name}/`,
          htmlDemoTemplate: `${generateOutlined ? 'templates/index-template-outlined.html' : 'templates/index-template.html'}`,
          htmlDemoFilename: 'index'
        }
      }
    },
    copy: {
      logo: {
        files: [
          { src: 'templates/logo.png', dest: `temp/${dist_folder_name}/images/`, flatten: true, expand: true }
        ]
      },
      css: {
        files: [
          { src: 'templates/index.css', dest: `temp/${dist_folder_name}/css/`, flatten: true, expand: true }
        ]
      },
      svg: {
        files: [{
          expand: true,
          dot: true,
          cwd: '../node_modules/eos-icons/svg/',
          src: ['**'],
          dest: './svg/'
        }]
      },
      svgOutlined: {
        files: [{
          expand: true,
          dot: true,
          cwd: '../node_modules/eos-icons/svg-outlined/',
          src: ['**'],
          dest: './svg-outlined/'
        }]
      },
      animated: {
        files: [{
          expand: true,
          dot: true,
          cwd: '../node_modules/eos-icons/animated-svg/',
          src: ['**'],
          dest: './svg/'
        }]
      },
      mergall: {
        files: [{
          expand: true,
          dot: true,
          cwd: './svg/material',
          src: ['**'],
          dest: './svg/'
        }]
      },
      mergallOutlined: {
        files: [{
          expand: true,
          dot: true,
          cwd: './svg-outlined/material',
          src: ['**'],
          dest: './svg-outlined/'
        }]
      }
    },
    replace: {
      replace_metadata: {
        src: [`temp/${dist_folder_name}/fonts/eos-icons.svg`],
        overwrite: true,
        replacements: [{
          from: /<metadata>(.|\n)*?<\/metadata>/,
          to: '<metadata>Created by EOS Design System</metadata>'
        }]
      }
    }
  })

  grunt.registerTask('bundleOutlined', async () => {
    await moveMissingSvgVersion({
      outlineSvgDir: OUTLINED_SVG,
      normalSvgDir: FILLED_SVG,
      tempFolder: OUTLINED_SVG
    })
  })

  grunt.loadNpmTasks('grunt-webfont')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-sass')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-text-replace')

  grunt.registerTask('default', ['copy:logo', 'webfont', 'copy:css', 'replace'])

  grunt.registerTask('moveFiles', ['copy:svg', 'copy:svgOutlined', 'copy:animated', 'copy:mergall', 'copy:mergallOutlined', 'bundleOutlined'])
}
