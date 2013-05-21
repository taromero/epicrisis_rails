module ErrorHandlerHelper

  def self.included(base)
    base.instance_eval do 

      rescue_from ActiveRecord::RecordInvalid do |ex|
        render json: {errors: ex.record.errors.messages.values[0], status: 500}.to_json, location: nil, status: 500
      end

    end  
  end 

end
