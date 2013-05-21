class ApplicationController < ActionController::Base
  include ErrorHandlerHelper
  protect_from_forgery
end
